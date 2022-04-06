function try()
{
    [[ $- = *e* ]]; SAVED_OPT_E=$?
    set +e
}

function throw()
{
    exit $1
}

function catch()
{
    export exception_code=$?
    (( $SAVED_OPT_E )) && set +e
    return $exception_code
}

export ERR_BAD=100

try
(
    read -p 'Migration name: ' NAME

    yarn typeorm:migration:gen $NAME > /dev/null 2>&1 || throw $ERR_BAD
    mv *.ts src/modules/database/migrations 
    yarn typeorm:migration:run

    echo "Migration was created successfully!"
)
catch || {
    echo -e '\033[05;31mNo changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command\033[00;37m'
}