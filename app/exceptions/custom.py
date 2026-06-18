class AppException(Exception):
    def __init__(self, message: str, status_code: int = 400):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class NotFoundError(AppException):
    def __init__(self, message: str = "Recurso no encontrado"):
        super().__init__(message, status_code=404)


class ConflictError(AppException):
    def __init__(self, message: str = "Conflicto con el estado actual del recurso"):
        super().__init__(message, status_code=409)


class BusinessValidationError(AppException):
    def __init__(self, message: str = "Error de validación"):
        super().__init__(message, status_code=422)
