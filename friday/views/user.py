from webargs import fields
from webargs.flaskparser import use_kwargs
from flask import session
from . import BaseView
from ..models.user import User as UserModel
from ..schemas.user import User as UserSchema


login_args = {
    'email': fields.Str(required=True, location='json'),
    'password': fields.Str(required=True, location='json'),
}


class LoginView(BaseView):
    # pylint: disable=no-self-use

    route_base = '/users/login'
    decorators = None

    @use_kwargs(login_args)
    def post(self, email, password):
        user = UserModel.authenticate(email, password)
        resp = UserSchema.jsonify(user)
        session['user_id'] = user.id
        session.permanent = True
        return resp, 200


class CurrentUser(BaseView):
    # pylint: disable=no-self-use

    route_base = '/users/current'

    def get(self):
        user = UserModel.current_user()
        return UserSchema.jsonify(user), 200
