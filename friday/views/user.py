from webargs import fields
from webargs.flaskparser import use_kwargs
from . import api, BaseView
from ..models import db
from ..models.user import User as UserModel
from ..schemas.user import User as UserSchema


login_args = {
    'email': fields.Str(required=True, location='json'),
    'password': fields.Str(required=True, location='json'),
}

class LoginView(BaseView):
    route_base = '/users/login'

    @use_kwargs(login_args)
    def post(self, email, password):
        user = UserModel.authenticate(email, password)
        return UserSchema.jsonify(user), 200

LoginView.register(api, 'user_login')
