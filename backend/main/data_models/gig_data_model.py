from typing import Dict
from dataclasses import dataclass
from ..db_models.gig import Gig


@dataclass
class GigDataModel:
    id: int
    title: str
    description: str
    category: str
    payout: int
    reputation_required: int

    def __init__(self, kwargs: Dict):
        self.__dict__.update(kwargs)

    def insert(self):
        pass
