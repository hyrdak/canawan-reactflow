import databaseService from 'databaseService'

const getNodes = async () => {
    const nodes = databaseService.getDataNodeList();

    return nodes;
};

export default getNodes;
