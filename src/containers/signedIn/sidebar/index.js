import React, { Component } from 'react';
import { Image, DeviceEventEmitter } from 'react-native';
import { Content, Header, Text, List, ListItem, Icon, Container, Thumbnail, Left, Body, Right, Badge, Spinner, View } from 'native-base';
import { connect } from 'react-redux';

import styles from './style';
import * as Screens from '../screens';

import * as categoryActions from '../../../reducers/category/actions';

const drawerCover = require('../../../../assets/drawer-cover.png');
const drawerImage = require('../../../../assets/logo-kitchen-sink.png');

const datas = [
	...Object.entries(Screens)
		.filter((screen) => {
			return screen[1].SideBar.show;
		})
		.sort((a, b) => {
			if (a[1].SideBar.sort > b[1].SideBar.sort) return 1;
			if (a[1].SideBar.sort < b[1].SideBar.sort) return -1;
			return 0;
		})
		.map((screen) => {
			return {
				name: screen[1].SideBar.name,
				route: screen[0],
				icon: screen[1].SideBar.icon,
				bg: screen[1].SideBar.bg
			};
		}),
	{
		name: 'Logout',
		route: 'SignedOut',
		icon: 'easel',
		bg: '#C5F442'
	}
];

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			categories: []
		};
	}

	componentWillMount() {
		this.props.dispatch(categoryActions.getAll());
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.appData.isFetching) {
			this.setState({ isFetching: true });
		}
		if (nextProps.appData.dataFetched) {
			this.setState({ isFetching: false, categories: nextProps.appData.data });
		}
	}

	navigate(route) {
		DeviceEventEmitter.emit('navigation', {
			name: route,
			params: {}
		});
	}

	render() {
		return (
			<Container style={styles.container}>
				<Header style={styles.header} span>
					<Image source={drawerCover} style={styles.drawerCover} />
					<Image square style={styles.drawerImage} source={drawerImage} />
				</Header>
				<Content
					refreshing={true}
					style={{
						flex: 1,
						backgroundColor: '#fff',
						top: -1
					}}
				>
					<List
						dataArray={datas}
						renderRow={(data) => (
							<ListItem button onPress={() => this.navigate(data.route)}>
								<Left>
									<Icon
										active
										name={data.icon}
										style={{
											color: '#777',
											fontSize: 26,
											width: 30
										}}
									/>
									<Text style={styles.text}>{data.name}</Text>
								</Left>
								{data.badge && (
									<Right
										style={{
											flex: 1
										}}
									>
										<Badge
											style={{
												borderRadius: 3,
												height: 25,
												width: 72,
												backgroundColor: data.bg
											}}
										>
											<Text style={styles.badgeText}>{data.badge}</Text>
										</Badge>
									</Right>
								)}
							</ListItem>
						)}
					/>
					{this.state.isFetching ? (
						<Spinner
							style={{
								marginTop: 30
							}}
							color="blue"
						/>
					) : (
						<List
              paddingTop={10}
							dataArray={this.state.categories}
							renderRow={(data) => (
								<ListItem thumbnail noBorder button>
									<Left>
										<Thumbnail circular small size={15} source={data.img} />
									</Left>
									<Body>
										<Text>{data.name}</Text>
									</Body>
								</ListItem>
							)}
						/>
					)}
				</Content>
			</Container>
		);
	}
}

mapStateToProps = (state) => {
	return { appData: state.appData };
};

export default connect(mapStateToProps)(SideBar);
