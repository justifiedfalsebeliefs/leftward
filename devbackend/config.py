import os

# database evnironment variables
MYSQL_HOST = os.getenv('MYSQL_HOST')
MYSQL_USER = os.getenv('MYSQL_USER')
MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
MYSQL_DB = os.getenv('MYSQL_DB')

# cognito auth environment variables
AWS_DEFAULT_REGION = os.getenv('AWS_DEFAULT_REGION') # 'eu-west-1'
AWS_COGNITO_DOMAIN = os.getenv('AWS_COGNITO_DOMAIN') # 'domain.com'
AWS_COGNITO_USER_POOL_ID = os.getenv('AWS_COGNITO_USER_POOL_ID') # 'eu-west-1_XXX'
AWS_COGNITO_USER_POOL_CLIENT_ID = os.getenv('AWS_COGNITO_USER_POOL_CLIENT_ID') # 'YYY'
AWS_COGNITO_USER_POOL_CLIENT_SECRET = os.getenv('AWS_COGNITO_USER_POOL_CLIENT_SECRET') # 'ZZZZ'
