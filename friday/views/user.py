from webargs import fields
from webargs.flaskparser import use_kwargs
from flask_jwt_extended import set_access_cookies
from . import api, BaseView
from ..models.user import User as UserModel
from ..schemas.user import User as UserSchema


login_args = {
    'email': fields.Str(required=True, location='json'),
    'password': fields.Str(required=True, location='json'),
}


class LoginView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/users/login'

    @use_kwargs(login_args)
    def post(self, email, password):
        user = UserModel.authenticate(email, password)
        resp = UserSchema.jsonify(user)
        set_access_cookies(resp, user.token)
        return resp, 200


LoginView.register(api, 'user_login')
