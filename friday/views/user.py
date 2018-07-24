from webargs import fields
from webargs.flaskparser import use_kwargs
from . import api, BaseView
from ..models.user import User as UserModel
from ..schemas.user import UserAuth


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
        rv = dict(user=user, token=user.token)
        return UserAuth.jsonify(rv), 200


LoginView.register(api, 'user_login')
