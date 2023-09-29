class Serialize:
    def __init__(self, **kwargs):
        self.data = kwargs

    def __getattr__(self, name):
        return self.data.get(name, None)

    def to_dict(self):
        return self.data  # The user data is already in the required format

    def __str__(self):
        return f"({', '.join(f'{key}={value}' for key, value in self.data.items())})"