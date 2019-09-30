const _ = require('lodash');
const {statusResponse} = require('./errors');

const ERRO_VALIDACAO_TIPO_CAMPO = 'Validation error';
const ERRO_VALIDACAO_BULK = 'AggregateError';

const enviaResposta = (res, resposta) => {
  try {
    if (res === undefined || res === null || res.statusCode === 404) {
      res.status(404).send();
    } else if (res.statusCode) {
      res.status(res.statusCode).json(resposta);
    } else {
      res.json(resposta);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const getRespostaBodyVazio = () => {
  const {codigo, mensagem} = statusResponse[422];
  return {
    codigo,
    mensagem: mensagem.concat(' - O body passado na requisição está vazio'),
  };
}; 

const getRespostaErroCamposModel = camposNaoExiste => {
  const {codigo, mensagem} = statusResponse[422];
  return {
    codigo,
    mensagem: mensagem.concat(
      ' - Campos não existem na model, ou não não foram informados todos campos necessários',
    ),
    campos: camposNaoExiste,
  };
};

const getRespostaParamtroIdNaoInformado = metodo => {
  const {codigo, mensagem} = statusResponse[422];
  return {
    codigo,
    mensagem: mensagem.concat(
      `. Para requisições ${metodo} é necessário informar o Id`,
    ),
  };
};

const trataErroParaRespostaRequisicao = erroTratar => {
  const defaultErro = {...statusResponse[500], erro: erroTratar};
  try {
    const erroBulk = erroTratar.name === ERRO_VALIDACAO_BULK;
    const errors = !erroBulk
      ? _.get(erroTratar, 'errors')
      : _.get(erroTratar, '0[errors].errors');
    const record = erroBulk ? _.get(erroTratar, '0[record]') : null;
    if (errors && errors.length) {
      for (const error of errors) {
        if (error.type && error.type === ERRO_VALIDACAO_TIPO_CAMPO) {
          const {codigo} = statusResponse[422];
          return {
            codigo,
            mensagem: error.message,
            objeto: record,
          };
        }
      }
    } else if (erroTratar.toString().includes(ERRO_VALIDACAO_TIPO_CAMPO)) {
      return {
        ...statusResponse[422],
        mensagem: erroTratar.toString(),
      };
    } else if (erroTratar.codigo) {
      return {
        ...statusResponse[erroTratar.codigo],
        mensagem: erroTratar.resposta,
      };
    }
    return {...defaultErro, erro: erroTratar ? erroTratar.toString() : errors};
  } catch (error) {
    return {...defaultErro, erro: erroTratar ? erroTratar.toString() : error};
  }
};

module.exports = {
  enviaResposta,
  getRespostaBodyVazio,
  getRespostaErroCamposModel,
  trataErroParaRespostaRequisicao,
  getRespostaParamtroIdNaoInformado,
};
