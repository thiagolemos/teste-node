const express = require('express');
const proprietarioTratoController = require('../controllers/ProprietarioController');
const {
  enviaResposta,
  trataErroParaRespostaRequisicao,
} = require('./utils/funcoesTratamentoRequisicao');

const router = express.Router();
const logger = require('./utils/logger')(__filename);

router.get('/', async (req, res) => {
  try {
    const resposta = await proprietarioTratoController.consultar(req, res);

    enviaResposta(res, resposta);
  } catch (erro) {
    logger.error(erro);
    logger.error(erro.message);
    trataErroParaRespostaRequisicao(erro);
  }
});

exports.default = router;
