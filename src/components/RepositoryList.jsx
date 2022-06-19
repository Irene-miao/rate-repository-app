import React from 'react';
import RepositoryListContainer from './RepositoryListContainer';
import Text from './Text';
import useRepositories from './useRepositories';


 


  function RepositoryList() {
    const { repositories } = useRepositories();



    return <RepositoryListContainer repositories={repositories} />;


}



  export default RepositoryList;