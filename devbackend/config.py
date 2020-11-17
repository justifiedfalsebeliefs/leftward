import os

# database evnironment variables
MYSQL_HOST = 'localhost' # os.getenv('MYSQL_HOST')
MYSQL_USER = 'root' # os.getenv('MYSQL_USER')
MYSQL_PASSWORD = 'making the world a better place one action at a time' # os.getenv('MYSQL_PASSWORD')
MYSQL_DB = 'lft' # os.getenv('MYSQL_DB')

# cognito auth variables
AWS_DEFAULT_REGION = 'us-east-1' # os.getenv('AWS_DEFAULT_REGION') # 'eu-west-1'
AWS_COGNITO_DOMAIN = 'https://leftwarddev.auth.us-east-1.amazoncognito.com'# os.getenv('AWS_COGNITO_DOMAIN') # 'domain.com'
AWS_COGNITO_USER_POOL_ID = 'us-east-1_7QdsUI1if' #os.getenv('AWS_COGNITO_USER_POOL_ID') # 'eu-west-1_XXX'
AWS_COGNITO_USER_POOL_CLIENT_ID = '6vc7a5a17v8b3enlcn2ab5fagn' #os.getenv('AWS_COGNITO_USER_POOL_CLIENT_ID') # 'YYY'
AWS_COGNITO_USER_POOL_CLIENT_SECRET = '' #os.getenv('AWS_COGNITO_USER_POOL_CLIENT_SECRET') # 'ZZZZ'
AWS_COGNITO_REDIRECT_URL = 'leftward.app' # os.getenv('AWS_COGNITO_REDIRECT_URL'