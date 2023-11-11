import logging
from typing import Dict, List
from .. import db
from ..db_models.user import User


class GigCategoryNames(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)


class GigStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, unique=True)


class Gig(db.Model):
    id = db.Column(db.Integer, primary_key=True)  # TODO: Fancy idea of using UUID as id, can be changed to int
    payout = db.Column("amount", db.Integer)
    title = db.Column(db.String)
    description = db.Column(db.String)
    category = db.Column(db.ForeignKey(GigCategoryNames.id))
    reputation_required = db.Column(db.Integer, nullable=True)
    status = db.Column(db.ForeignKey(GigStatus.id))
    opened_by = db.Column(db.ForeignKey(User.id))  # TODO: What if user want to post it with different handle?
    taken_by = db.Column(db.ForeignKey(User.id), nullable=True)  # TODO: What if user want to use different handle?
    archived = db.Column(db.Boolean, default=False)

    def to_dict(self) -> Dict:
        return {
            "id": self.id,
            "amount": self.payout,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "reputation_required": self.reputation_required,
            "status": self.status,
            "opened_by": self.opened_by,
            "taken_by": self.taken_by,
            "archived": self.archived
        }


def allowed_params() -> List:
    return [
        "id",
        "payout",
        "title",
        "description",
        "category",
        "reputation_required",
        "status",
        "opened_by",
        "taken_by"
    ]


def create_gig(data) -> int:
    category = data["category"]

    if category is not int:
        category_id = GigCategoryNames.query.filter_by(name=category).first()
    else:
        category_id = data["category"]

    if category_id:
        data["category"] = category_id.id
    else:
        raise ValueError(f"No such category: {category}")

    new_gig = Gig(**data)
    db.session.add(new_gig)
    db.session.commit()

    return new_gig.id


def get_all_gigs():
    return Gig.query.all()


def get_gig_by_id(gig_id: int):
    return Gig.query.filter_by(id=gig_id, archived=False).first()


def delete_gig_by_id(gig_id: int):
    condition = Gig.id == gig_id
    db.session.query(Gig).filter(condition).update({"archived": True})
    db.session.commit()
