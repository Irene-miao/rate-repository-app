import RepositoryListContainer from './RepositoryListContainer';
import {useRepositories} from './useRepositories';
import {useNavigate} from 'react-router-dom';



const RepositoryList = ({variables}) => {
    const {repositories, fetchMore} = useRepositories(
       variables
    );

    const onEndReach = () => {
fetchMore();
    };


    return (
        <RepositoryListContainer repositories={repositories} onEndReach={onEndReach} navigate={useNavigate()}/>
    )
};

export default RepositoryList;