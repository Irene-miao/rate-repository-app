import { Text, View} from 'react-native';
import {render} from '@testing-library/react-native';


const Greeting = ({name}) => {
    return (
        <View>
            <Text>Hello {name}</Text>
        </View>
    );
};

describe('Greeting', () => {
    it('renders a greeting message based o nthe name prop', () => {
        const {debug, getByText} = render(<Greeting name="Pop" />);

        debug();

        expect(getByText('Hello Pop')).toBeDefined();
    });
});