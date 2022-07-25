// This file contains code for image to show with dynamic height width base upon device and image data so look perfect

import React, { Component, PropTypes } from "react";
import ProgressiveFastImage from "@freakycoder/react-native-progressive-fast-image";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { Colors } from "@common";

export class AutoScaleImage extends Component {
constructor(props) {
    super(props);
    this.state = { height:0,width:0 };
}

componentWillMount() {
   
    let heightOfImage = this.props.heightOfImage
    let widthOfImage = this.props.widthOfImage
    
    if (this.props.width && !this.props.height) {
        this.setState({
            width: this.props.width,
            height: heightOfImage * (this.props.width / widthOfImage)
        });
    } else if (!this.props.width && this.props.height) {
        this.setState({
            width: widthOfImage * (this.props.height / heightOfImage),
            height: this.props.height
        });
    } else {
        this.setState({ width: widthOfImage, height: heightOfImage });
    }
}

render() {
    return (
        <ProgressiveFastImage source={{ uri: this.props.uri,priority:"high"}} style={{height:this.state.height,width:this.state.width}} thumbnailSource={{uri:this.props.uri}} loadingImageStyle={{
            width: heightPercentageToDP("10%"),
            aspectRatio:1,
            alignSelf: 'center',
            backgroundColor:Colors.Disable
          }}  />
    );
}
}

// AutoScaleImage.propTypes = {
// uri: PropTypes.string.isRequired,
// width: PropTypes.number,
// height: PropTypes.number
// };