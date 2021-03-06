"use strict";

const encrypter = require("../../../utils/encrypter");

module.exports = (usersService, authsService, filesService) => {
  async function list() {
    return usersService.list();
  }

  async function get(id) {
    const params = {
      id_user: id,
    };

    return usersService.get(params);
  }

  async function insert(body, { myAvatar }) {
    console.log(body, myAvatar);
    const dataAvatar = await filesService.uploadFile(myAvatar[0].path);

    body = {
      ...body,
      myAvatar: dataAvatar.secure_url,
    };
    console.log(body);
    const recordset = await usersService.insert(body);

    if (recordset.id_user) {
      const encryptedPwd = await encrypter.hash(body.password);
      const authData = {
        id_user: recordset.id_user,
        username: body.username,
        password: encryptedPwd,
      };
      console.log(authData);

      await authsService.insert(authData);
    }

    return recordset;
  }

  async function update(id, body) {
    return await usersService.update(id, body);
  }
  async function patch(id, { myAvatar }) {
    const dataAvatar = await filesService.uploadFile(myAvatar[0].path);

    const body = {
      myAvatar: dataAvatar.secure_url,
    };
    return await usersService.patch(id, body);
  }

  async function patchExpereince(params, body, { myFile }) {
    console.log(myFile);
    const dataMyFile = await filesService.uploadFile(myFile[0].path);

    body = {
      ...body,
      file_url: dataMyFile.secure_url,
    };
    console.log(body);
    return await usersService.patchExpereince(params, body);
  }

  async function remove(id) {
    const params = {
      id_user: id,
    };
    const recordset = await usersService.remove(params);
    if (recordset.count > 0) {
      await authsService.remove(params);
    }
    return recordset;
  }

  async function getPostulations(params) {
    const recordset = await usersService.getPostulations(params);

    return recordset;
  }

  async function getProblems(params) {
    const recordset = await usersService.getProblems(params);
    return recordset;
  }

  async function getUserLanguages(params) {
    const recordset = await usersService.getUserLanguages(params);
    return recordset;
  }

  async function getConnections(params) {
    const recordSet = await usersService.getConnections(params);
    return recordSet;
  }

  return {
    list,
    get,
    insert,
    update,
    patch,
    remove,
    getPostulations,
    getProblems,
    getUserLanguages,
    getConnections,
    patchExpereince,
  };
};
