from enum import Enum

from django.db import IntegrityError


class IntegrityErrorType(Enum):
    UNKNOWN = "UNKNOWN"
    UNIQUE_CONSTRAINT = "duplicate key value violates unique constraint"


def get_error_type(e: IntegrityError) -> IntegrityErrorType:
    if IntegrityErrorType.UNIQUE_CONSTRAINT.value in str(e):
        return IntegrityErrorType.UNIQUE_CONSTRAINT
    return IntegrityErrorType.UNKNOWN
