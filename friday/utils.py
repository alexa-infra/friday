from datetime import datetime
import random
import bcrypt
from markdown.extensions import Extension
from markdown.inlinepatterns import SimpleTagPattern


DEL_RE = r'(~~)(.*?)~~'


class MarkdownStrikeExt(Extension):
    def extendMarkdown(self, md, md_globals):
        del_tag = SimpleTagPattern(DEL_RE, 'del')
        md.inlinePatterns.add('del', del_tag, '>not_strong')


def utcnow():
    return datetime.utcnow()


def make_password_hash(password):
    salt = bcrypt.gensalt(prefix=b"2b", rounds=12)
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed_password.decode('utf-8')


def check_password_hash(password, hashed_password):
    hashed = hashed_password.encode('utf-8')
    return bcrypt.hashpw(password.encode('utf-8'), hashed) == hashed


def get_random_string(length=12,
                      allowed_chars='abcdefghijklmnopqrstuvwxyz'
                                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                                    '0123456789!@#$%^&*(-_=+)'):
    rng = random.SystemRandom()
    return ''.join(rng.choice(allowed_chars) for i in range(length))
