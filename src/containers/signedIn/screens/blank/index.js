import React, { Component } from 'react';
import { DeviceEventEmitter } from 'react-native';
import { View } from 'native-base';

import styles from './styles';

class Blank extends Component {

	render() {
		return <View style={styles.container} />;
	}
}

export default {
	Component: Blank,
	Footer: { show: true, name: 'Blank', icon: 'compass', sort: 0, active: false, visible: true },
	SideBar: { show: true, name: 'Blank', icon: 'compass', sort: 1, bg: '#C5F442' }
};
