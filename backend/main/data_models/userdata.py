from typing import List, Dict
from ..db_models.user import User, AffiliationList


class UserData:

    def get_all_users(self, full_details=False) -> List[Dict]:
        user_list = []
        users = User.query.join(AffiliationList).all()

        for user in users:
            user_list.append(self._convert_user_to_dict(user))

        return user_list

    def get_transaction_list(self):
        pass

    def get_account_balance(self):
        pass

    def get_details(self):
        pass

    def get_hidden_details(self):
        pass

    def _convert_user_to_dict(self, user: User) -> Dict:
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
