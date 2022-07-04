import RepositoryListContainer from './RepositoryListContainer';
import {useRepositories} from '../hooks/useRepositories';
import {useSearchRepo} from '../hooks/useSearchRepo';
import {useOrderByRepo} from '../hooks/useOrderByRepo';
import {useNavigate} from 'react-router-dom';



const RepositoryList = ({variables}) => {
    const {repositories, fetchMore} = useRepositories(
       variables
    );
    const {searchRepositories} = useSearchRepo(variables);

const {orderByRepositories} = useOrderByRepo(variables)


    const onEndReach = () => {
fetchMore();
    };


    if (variables.first) {
      return  (<RepositoryListContainer repositories={repositories} onEndReach={onEndReach} navigate={useNavigate()}/>)
    } else if (variables.orderBy && variables.orderDirection) {
        return (<RepositoryListContainer navigate={useNavigate()} repositories={orderByRepositories}  />);
      } else if (variables.searchKeyword) {
        return (<RepositoryListContainer navigate={useNavigate()} repositories={searchRepositories} />);
      };
         
};

export default RepositoryList;