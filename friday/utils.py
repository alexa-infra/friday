import re
from datetime import datetime
import random
import bcrypt
from markdown.extensions import Extension
from markdown.inlinepatterns import SimpleTagPattern


DEL_RE = r"(~~)(.*?)~~"


class MarkdownStrikeExt(Extension):
    def extendMarkdown(self, md):
        del_tag = SimpleTagPattern(DEL_RE, "del")
        md.inlinePatterns.register(del_tag, "del", 40)


def utcnow() -> datetime:
    return datetime.utcnow()


def make_password_hash(password: str) -> str:
    salt = bcrypt.gensalt(prefix=b"2b", rounds=12)
    hashed_password = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed_password.decode("utf-8")


def check_password_hash(password: str, hashed_password: str) -> bool:
    hashed = hashed_password.encode("utf-8")
    return bcrypt.hashpw(password.encode("utf-8"), hashed) == hashed


def get_random_string(
    length: int = 12,
    allowed_chars: str = "abcdefghijklmnopqrstuvwxyz"
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    "0123456789!@#$%^&*(-_=+)",
):
    rng = random.SystemRandom()
    return "".join(rng.choice(allowed_chars) for i in range(length))


def camel_to_snake(name: str) -> str:
    s1 = re.sub("(.)([A-Z][a-z]+)", r"\1_\2", name)
    return re.sub("([a-z0-9])([A-Z])", r"\1_\2", s1).lower()
