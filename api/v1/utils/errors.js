const Enum = require('enum');

const statusResponse = new Enum({
  200: {codigo: 200, mensagem: 'ok'},
  201: {codigo: 201, mensagem: 'Criado com sucesso'},
  202: {
    codigo: 202,
    mensagem: 'Requisição ok, porém insersão não foi concluída',
  },
  204: {codigo: 204, mensagem: 'Sem conteúdo'},
  400: {codigo: 400, mensagem: 'Formato requisção inválido'},
  401: {codigo: 401, mensagem: 'Não autorizado'},
  404: {codigo: 404, mensagem: 'Rota não existe'},
  409: {
    codigo: 409,
    mensagem: 'Houve um conflito ao inserir o registro informado',
  },
  422: {codigo: 422, mensagem: 'Não foi possível realizar operação'},
  500: {codigo: 500, mensagem: 'Erro interno'},
}).toJSON();

module.exports = {statusResponse};
