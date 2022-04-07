// importacao de modulos
const User = require('../models/User');
const router = require("express").Router()

// cadastrar usuario
router.post('/create', async (req, res) => {

    // tratar dados do body
    const {name, salary, approved} = req.body;

    if (!name) {
        return res.status(422).json({
            message: "Params invalid - name",
            status_code: 422
        });
    }

    if (!salary) {
        return res.status(422).json({
            message: "Params invalid - salary",
            status_code: 422
        });
    }

    if (!approved) {
        return res.status(422).json({
            message: "Params invalid - approved",
            status_code: 422
        });
    }

    const user = {
        name,
        salary,
        approved,
    }

    // criar dado na base
    try {

        await User.create(user);

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso",
            status_code: 201,
        });

    } catch (error) {
        return res.status(500).json({
            erro: error,
        });
    }

});

// buscar usuario
router.get('/get-users', async (req, res) => {

    // buscar dados na base
    try {

        const users = await User.find();
        return res.status(200).json(users);

    } catch (error) {
        return res.status(500).json({
            erro: error,
        });
    }

});

// buscar usuario
router.get('/get-user/:id', async (req, res) => {

    const user_id = req.params.id;

    try {

        const user = await User.findOne({_id: user_id});

        if ( !user ) {
            return res.status(422).json({
                message: "User not found!",
                status_code: 422,
            });
        }

        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            erro: error,
        });
    }

});

// atualizar usuario
router.patch("/update-user/:id", async (req, res) => {

    const user_id = req.params.id;

    // tratar dados do body
    const {salary, approved} = req.body;

    if (!salary) {
        return res.status(422).json({
            message: "Params invalid - salary",
            status_code: 422
        });
    }

    if (!approved) {
        return res.status(422).json({
            message: "Params invalid - approved",
            status_code: 422
        });
    }

    const user_data = {salary, approved};

    try {

        const user = await User.updateOne({_id: user_id}, user_data);

        if ( user.matchedCount === 0 ) {
            return res.status(422).json({
                message: "User not found!",
                status_code: 422,
            });
        }

        res.status(200).json(user);

    } catch (error) {
        return res.status(500).json({
            erro: error,
        });
    }

});

// deletar usuario
router.delete("/delete-user/:id", async (req, res) => {

    const user_id = req.params.id;

    try {

        const user = await User.deleteOne({_id: user_id});

        if ( user.deletedCount === 0 ) {
            return res.status(422).json({
                message: "User not found!",
                status_code: 422,
            });
        }

        res.status(200).json({
            message: "User deleted with successfully!"
        });

    } catch (error) {
        return res.status(500).json({
            erro: error,
        });
    }

});

module.exports = router;