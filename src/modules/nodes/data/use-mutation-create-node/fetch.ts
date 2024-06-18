import databaseService from 'databaseService'


const createNode = async () => {
    const node = databaseService.getDataNodeList();

    return node
}

export default createNode
