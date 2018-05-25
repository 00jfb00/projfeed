import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { View, Text } from 'native-base';
import PropTypes from 'prop-types';

import styles from './styles';

class Home extends Component {
	static propTypes = {
		icons: PropTypes.any.isRequired
	};

	constructor(props) {
		super(props);
		console.log(props);
		props.navigator.setButtons({
			rightButtons: [
				{
					icon: props.icons['ios-menu'],
					id: 'menu'
				}
			]
		});
		props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
	}

	onNavigatorEvent(event) {
		console.log(event);
		if (event.type == 'NavBarButtonPress')
			switch (event.id) {
        case 'menu':
        console.log("FOI")
					this.props.navigator.toggleDrawer({
						side: 'right',
						animated: true
					});
					break;
				default:
					console.log('Unhandled event ' + event.id);
					break;
			}
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>Content goes here</Text>
			</View>
		);
	}
}

export default {
	Component: Home,
	Footer: {
		show: true,
		name: 'Home',
		icon: 'home',
		sort: 1,
		active: true,
		visible: true
	},
	SideBar: {
		show: false,
		name: 'Home',
		icon: 'home',
		sort: 0,
		bg: '#C5F442',
		modal: false
	}
};
