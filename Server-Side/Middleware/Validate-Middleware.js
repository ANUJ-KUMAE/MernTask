const validate = (schema) => async (req, resp, next)  => {
    try {
        const parsebody = await schema.parseAsync(req.body);
        req.body = parsebody;
        next();
    } catch (err) {

        const status = 422;
        const message = err.errors[0].message;

        const error = {
            status,
            message
        }
        //console.log(error);
        //return resp.status(400).send({msg:message});
        next(error)
    }

};

module.exports = validate;