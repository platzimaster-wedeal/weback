'use strict'

module.exports = (problemService, filesService) => {
  
    async function list () {
        return problemService.list()
      }
    
      async function get (id) {
        const params = {
          id_problem: id
        }
    
        return problemService.get(params)
      }

      async function insert(body, {myFile}) {
        const paths = [!myFile ? '' : myFile[0].path]
        const data = await filesService.uploadFile(paths);
    
        body = {
          ...body,
          file_url: data.myFile,
          /* myAvatar: data.myAvatar */
        };

        const recordset = await problemService.insert(body)

        return recordset
      }
      async function update (id, body, {myFile, myAvatar}) {
        const paths = [myFile[0].path, myAvatar[0].path]
        const data = await filesService.uploadFile(paths);
        body = {
          ...body,
          file_url: data.myFile.secure_url,
          myAvatar: data.myAvatar.secure_url
        };
        return await problemService.update(id, body)
      }
      async function remove (id) {
        const params = {
          id_problem: id
        }
        const recordset = await authsService.remove(params)
        if (recordset.count > 0) {
          await problemService.remove(params)
        }
        return recordset
      }

      return {
        list,
        get,
        insert,
        update,
        remove
      }
}