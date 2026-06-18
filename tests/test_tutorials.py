def test_health_check(client):
    response = client.get("/")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_create_tutorial(client, sample_tutorial_payload):
    response = client.post("/api/v1/tutorials", json=sample_tutorial_payload)
    assert response.status_code == 201
    data = response.json()
    assert data["title"] == sample_tutorial_payload["title"]
    assert data["published"] is True
    assert data["detail"]["created_by"] == sample_tutorial_payload["detail"]["created_by"]
    assert data["detail"]["tutorial_id"] == data["id"]
    assert "created_on" in data["detail"]


def test_create_tutorial_server_sets_created_on(client, sample_tutorial_payload):
    response = client.post("/api/v1/tutorials", json=sample_tutorial_payload)
    assert response.status_code == 201
    assert response.json()["detail"]["created_on"] is not None


def test_list_tutorials(client, sample_tutorial_payload):
    client.post("/api/v1/tutorials", json=sample_tutorial_payload)
    response = client.get("/api/v1/tutorials")
    assert response.status_code == 200
    assert len(response.json()) == 1


def test_list_tutorials_filter_by_published(client, sample_tutorial_payload):
    client.post("/api/v1/tutorials", json=sample_tutorial_payload)
    unpublished = {**sample_tutorial_payload, "title": "Borrador", "published": False}
    client.post("/api/v1/tutorials", json=unpublished)

    published_response = client.get("/api/v1/tutorials?published=true")
    assert published_response.status_code == 200
    assert len(published_response.json()) == 1
    assert published_response.json()[0]["published"] is True


def test_list_tutorials_filter_by_unpublished(client, sample_tutorial_payload):
    client.post("/api/v1/tutorials", json=sample_tutorial_payload)
    unpublished = {**sample_tutorial_payload, "title": "Borrador", "published": False}
    client.post("/api/v1/tutorials", json=unpublished)

    response = client.get("/api/v1/tutorials?published=false")
    assert response.status_code == 200
    assert len(response.json()) == 1
    assert response.json()[0]["published"] is False


def test_get_tutorial(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    response = client.get(f"/api/v1/tutorials/{created['id']}")
    assert response.status_code == 200
    assert response.json()["detail"]["tutorial_id"] == created["id"]


def test_get_tutorial_not_found(client):
    response = client.get("/api/v1/tutorials/999")
    assert response.status_code == 404


def test_update_tutorial(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    response = client.put(
        f"/api/v1/tutorials/{created['id']}",
        json={"title": "FastAPI avanzado", "published": False},
    )
    assert response.status_code == 200
    data = response.json()
    assert data["title"] == "FastAPI avanzado"
    assert data["published"] is False


def test_update_tutorial_not_found(client):
    response = client.put("/api/v1/tutorials/999", json={"title": "No existe"})
    assert response.status_code == 404


def test_update_tutorial_empty_body(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    response = client.put(f"/api/v1/tutorials/{created['id']}", json={})
    assert response.status_code == 422


def test_delete_tutorial_not_found(client):
    response = client.delete("/api/v1/tutorials/999")
    assert response.status_code == 404


def test_get_and_update_detail(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    tutorial_id = created["id"]

    detail_response = client.get(f"/api/v1/tutorials/{tutorial_id}/detail")
    assert detail_response.status_code == 200

    update_response = client.put(
        f"/api/v1/tutorials/{tutorial_id}/detail",
        json={"created_by": "admin@udistrital.edu.co"},
    )
    assert update_response.status_code == 200
    assert update_response.json()["created_by"] == "admin@udistrital.edu.co"


def test_update_detail_not_found(client):
    response = client.put(
        "/api/v1/tutorials/999/detail",
        json={"created_by": "admin@udistrital.edu.co"},
    )
    assert response.status_code == 404


def test_update_detail_empty_body(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    response = client.put(f"/api/v1/tutorials/{created['id']}/detail", json={})
    assert response.status_code == 422


def test_delete_tutorial_cascades_detail(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    tutorial_id = created["id"]

    delete_response = client.delete(f"/api/v1/tutorials/{tutorial_id}")
    assert delete_response.status_code == 204

    assert client.get(f"/api/v1/tutorials/{tutorial_id}").status_code == 404
    assert client.get(f"/api/v1/tutorials/{tutorial_id}/detail").status_code == 404


def test_delete_detail_success(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    tutorial_id = created["id"]

    delete_response = client.delete(f"/api/v1/tutorials/{tutorial_id}/detail")
    assert delete_response.status_code == 204

    assert client.get(f"/api/v1/tutorials/{tutorial_id}/detail").status_code == 404
    tutorial_response = client.get(f"/api/v1/tutorials/{tutorial_id}")
    assert tutorial_response.status_code == 200
    assert tutorial_response.json()["detail"] is None


def test_delete_detail_not_found(client):
    response = client.delete("/api/v1/tutorials/999/detail")
    assert response.status_code == 404


def test_post_detail_after_delete(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    tutorial_id = created["id"]

    client.delete(f"/api/v1/tutorials/{tutorial_id}/detail")

    new_detail = {"created_by": "nuevo.autor@udistrital.edu.co"}
    response = client.post(f"/api/v1/tutorials/{tutorial_id}/detail", json=new_detail)
    assert response.status_code == 201
    assert response.json()["created_by"] == new_detail["created_by"]
    assert response.json()["tutorial_id"] == tutorial_id
    assert response.json()["created_on"] is not None


def test_post_detail_conflict(client, sample_tutorial_payload):
    created = client.post("/api/v1/tutorials", json=sample_tutorial_payload).json()
    detail_payload = {"created_by": "otro@udistrital.edu.co"}
    response = client.post(f"/api/v1/tutorials/{created['id']}/detail", json=detail_payload)
    assert response.status_code == 409


def test_post_detail_not_found(client):
    detail_payload = {"created_by": "otro@udistrital.edu.co"}
    response = client.post("/api/v1/tutorials/999/detail", json=detail_payload)
    assert response.status_code == 404


def test_create_tutorial_requires_detail(client):
    response = client.post(
        "/api/v1/tutorials",
        json={"title": "Sin detalle", "description": "Inválido", "published": False},
    )
    assert response.status_code == 422


def test_field_max_length_validation(client, sample_tutorial_payload):
    too_long = "x" * 256
    payload = {
        **sample_tutorial_payload,
        "title": too_long,
    }
    response = client.post("/api/v1/tutorials", json=payload)
    assert response.status_code == 422
