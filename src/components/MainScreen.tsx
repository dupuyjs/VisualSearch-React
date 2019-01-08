import * as React from 'react'
import { Button } from 'react-native'
import { Component } from 'react'
import { NavigationScreenProps } from 'react-navigation'
import { ScrollView } from 'react-native'

class DestinationAndTitle {
    constructor(
        destination: string,
        title?: string
    ) {
        this.destination = destination

        if (title === undefined) {
            this.title = destination
        }
        else {
            this.title = title
        }
    }

    public destination: string
    public title: string
}

// tslint:disable-next-line:max-classes-per-file
export class MainScreen extends Component<NavigationScreenProps> {
    public static navigationOptions = {
        title: 'Home'
    }

    public render() {
        return (
            <ScrollView
                style={{
                    backgroundColor: '#f4f4f4',
                    flex: 1
                }}
            >
                {this.destinationAndTitlePairs.map(destinationAndTitle =>
                    <Button
                        key={destinationAndTitle.destination}
                        onPress={() => this.props.navigation.navigate(destinationAndTitle.destination)}
                        title={destinationAndTitle.title}
                    />
                )}
            </ScrollView>
        )
    }

    private destinationAndTitlePairs: Array<DestinationAndTitle> = [
        new DestinationAndTitle('FetchVisualSearch', 'Bing Visual Search sample'),
        // new DestinationAndTitle('StartWorking'),
        // new DestinationAndTitle('CameraScreen')
    ]
}