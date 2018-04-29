import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator, View, Alert, FlatList, TouchableOpacity, Image } from 'react-native';
import TimeAgo from '../Common/time';
import { connect } from 'react-redux';

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  };
  componentDidMount() {
    const { getNews } = this.props;
    getNews();
  }
  check(words) {
    if (words == null) {
      return ' ';
    }
    return words.toString();
  };
  open(ur) {
    Linking.canOpenURL(ur.toString()).then(supported => {
      if (supported) {
        Linking.openURL(ur.toString());
      }
      else {
        alert('Error: cannot open this url');
      }
    });
  };
  changeState(index) {
    const { selected } = this.state;
    const i = selected.indexOf(index);
    if (i > -1) {
      selected.splice(i, 1);
    } else {
      selected.push(index);
    }
    console.log(selected);
    this.setState({ selected });
  }
  displayList(data) {
    const { item, index } = data;
    const { urlToImage, description, source, publishedAt, title, url } = item;
    const { selected } = this.state;
    const i = selected.indexOf(index);
    const details = (i > -1) ? (
      <View>
        <Text>{this.check(description)} </Text>
        <Text note>{this.check(source.name)} </Text>
          <View style={{alignItems: 'flex-end', marginRight: 5}} >
            <TimeAgo date={publishedAt} />
          </View>
      </View>) : (<Text />);
    const timeDetails = (i > -1) ? (<Text />) : (<TimeAgo date={publishedAt} />);
    return (
      <TouchableOpacity style={{ backgroundColor: "#fff4d8", flex: 1, flexDirection: 'row', borderColor: '#2d9961', borderBottomWidth: 1, padding: 5 }} activeOpacity={0.5} onPress={() => this.changeState(index)}>
        <View style={{ flex: 3, justifyContent: "flex-start" }}>
          <Image style={{ width: 100, height: 120, resizeMode: 'stretch' }} source={{ uri: urlToImage != null ? this.check(urlToImage) : 'https://images.pexels.com/photos/789141/pexels-photo-789141.jpeg?h=350&auto=compress&cs=tinysrgb' }} />
        </View>
        <View style={{ flex: 5, flexWrap: 'wrap' }}>
          <Text style={{ fontSize: 16, color: "#2d9961" }}>{this.check(title)} </Text>
          <View style={{ alignItems: 'flex-end', marginRight: 5 }}>
            {timeDetails}
          </View>
          {details}
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    console.log(this.props.newsHeadlines);
    const {newsHeadlines} = this.props;
    let length=0;
    if(newsHeadlines){length = newsHeadlines.length};
    const ViewGeneric = this.props.isLoading ? (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator animating={this.props.isLoading} animating={this.props.isLoading} />
        <Text>Please Wait </Text>
      </View>
    ) : (
          <FlatList
            data={this.props.newsHeadlines}
            renderItem={(item) => this.displayList(item)}
            keyExtractor={(item) => item.url}
            extraData={this.state}
          />
      );
    return (
      <View style={{flex: 1, backgroundColor:"#ffff"}}>
        <View style={{margin: 10}}>
          <Text style={{color: "#2d9961", fontSize: 25, fontWeight: "bold"}}> All categories ({length})  </Text>
        </View>
        <View style={{marginHorizontal: 10, marginVertical: 25}}>
          {ViewGeneric}
        </View>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#26633e',
    paddingLeft: 10,
    paddingRight: 40,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  header: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
  },
  touch: {
    flex: 1,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }

});

const mapStateToProps = ({ news }) => {
  const {
    newsheadlines, loading
  } = news;
  return {
    newsHeadlines: newsheadlines,
    isLoading: loading
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getNews: () => {
      dispatch({
        type: 'FETCH_NEWS',
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);



/*<List
dataArray={this.state.data}
renderRow={(item)=>{
    return(
      <ListItem> 
          <ListDataItem data={item} />
      </ListItem>

    )
  }
} /> 

<Left>
              <Title children="News App" />
              </Left>*/