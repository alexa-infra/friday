from flask_jwt_extended import create_access_token, get_jwt_identity, set_access_cookies
from webargs import fields

from ..models.user import User as UserModel
from ..schemas.user import User as UserSchema
from .base import BaseView, use_kwargs

login_args = {
    "email": fields.Str(required=True),
    "password": fields.Str(required=True),
}


class LoginView(BaseView):
    # pylint: disable=no-self-use

    route_base = "/users/login"
    decorators = None

    @use_kwargs(login_args, location="json")
    def post(self, email, password):
        user = UserModel.authenticate(email, password)
        access_token = create_access_token(identity=user.id)
        response = UserSchema.jsonify(user)
        set_access_cookies(response, access_token)
        return response, 200


class CurrentUser(BaseView):
    # pylint: disable=no-self-use

    route_base = "/users/current"

    def get(self):
        user_id = get_jwt_identity()
        user = UserModel.identify(user_id)
        return UserSchema.jsonify(user), 200
