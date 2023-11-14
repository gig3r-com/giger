from typing import List, Dict
from ..db_models.user import User, AffiliationList


class UserDataModel:

    def get_all_users(self) -> List[Dict] | None:
        user_list = []
        users = User.query.join(AffiliationList).all()

        for user in users:
            user_list.append(self._convert_to_min_details(user))

        return user_list

    def get_full_user_details_by_id(self, user_id):
        user = User.query.get(user_id)

        return self._convert_to_full_details(user)

    def get_transaction_list_by_id(self):
        pass

    def get_account_balance_by_id(self):
        pass

    def _convert_to_full_details(self, user: User) -> Dict | None:
        return {
            'id': user.id,
            'name': user.first_name,
            'surname': user.last_name,
            'handle': user.handle,
            'alias': user.alias,
            'IDValidTo': user.id_valid_to,
            'insurance': user.insurance,
            'age': user.age,
            'cyberwarePercentage': user.cyberware_percentage,
            'affiliation': user.affiliation_name.name,
            'profession': user.profession,
            'reputation': user.reputation,
            'type': user.identity_name.name,
        }

    def _convert_to_min_details(self, user: User) -> Dict | None:
        return {
            'id': user.id,
            'name': user.first_name,
            'surname': user.last_name,
            'handle': user.handle,
            'alias': user.alias
        }
