import React from 'react';
import PropTypes from 'prop-types';
import { TouchableWithoutFeedback, Animated } from 'react-native';

/**
 * @typedef {Object} TouchableWithoutFeedbackProps
 * @property {Object} children
 * @property {Object} [accessibilityComponentType]
 * @property {boolean} [accessibilityTraits]
 * @property {boolean} [accessible]
 * @property {number} [delayLongPress]
 * @property {number} [delayPressIn]
 * @property {number} [delayPressOut]
 * @property {boolean} [disabled]
 * @property {Object} [hitSlop]
 * @property {{top: number, left: number, bottom: number, right: number}} [hitSlop]
 * @property {Function} [onLayout]
 * @property {Function} [onLongPress]
 * @property {Function} [onPress]
 * @property {Function} [onPressIn]
 * @property {Function} [onPressOut]
 * @property {{top: number, left: number, bottom: number, right: number}} [pressRetentionOffset]
 */

/**
 * @typedef {TouchableWithoutFeedbackProps} TouchableScaleProps
 * @property {Object} [style]
 * @property {number} [defaultScale=1]
 * @property {number} [activeScale=0.9]
 * @property {number} [activeColor=null]
 * @property {number} [stiffness=100]
 * @property {number} [damping=10]
 * @property {number} [mass=1]
 * @property {number} [pressInStiffness]
 * @property {number} [pressInDamping]
 * @property {number} [pressOutStiffness]
 * @property {number} [pressOutDamping]
 * @property {boolean} [useNativeDriver]
 */
export default class TouchableScale extends React.Component {
  constructor(...args) {
    super(...args);
    /** @type {TouchableScaleProps} */
    const props = this.props;

    this.onPressIn = this.onPressIn.bind(this);
    this.onPressOut = this.onPressOut.bind(this);
    this.scaleAnimation = new Animated.Value(props.defaultScale);
  }

  render() {
    /** @type {TouchableScaleProps} */
    const props = this.props;

    const colorStyle = props.activeColor ?
      {
        opacity: this.scaleAnimation.interpolate(
          {
            inputRange: [props.activeScale, props.defaultScale],
            outputRange: [0.5, 0],
            extrapolate: 'clamp'
          }
        ),
        backgroundColor: props.activeColor
      }
      :
      {};


    return (
      <TouchableWithoutFeedback
        // todo: pass only TouchableWithoutFeedback's props.
        {...props}
        onPress={() => {
          if (props.disabled) {
            return;
          } else {
            if (props.onPress) {
              props.onPress();
            }
            this.onPressIn();
            setTimeout(() => {
              this.onPressOut();
            }, 100);
          }
        }}
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
      >
        <Animated.View
          style={[props.style, {
            transform: [
              { scale: this.scaleAnimation },
            ]
          },
          ]}
        >
          {
            props.activeColor
            &&
            <Animated.View
              style={[props.style, colorStyle, { position: 'absolute', width: '100%', height: '100%' }]}
            />
          }
          {props.children}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

  onPressIn(...args) {
    /** @type {TouchableScaleProps} */
    const props = this.props;
    const stiffness = typeof props.pressInStiffness !== 'undefined' ? props.pressInStiffness : props.stiffness;
    const damping = typeof props.pressInDamping !== 'undefined' ? props.pressInDamping : props.damping;
    const mass = typeof props.pressInMass !== 'undefined' ? props.pressInMass : props.mass;

    if (props.disabled) {
      return;
    }

    Animated.spring(this.scaleAnimation, {
      toValue: props.activeScale,
      stiffness: stiffness,
      damping: damping,
      mass: mass,
      useNativeDriver: props.useNativeDriver,
    }).start();

    if (props.onPressIn) {
      props.onPressIn(...args);
    }
  }

  onPressOut(...args) {
    /** @type {TouchableScaleProps} */
    const props = this.props;
    const stiffness = typeof props.pressOutStiffness !== 'undefined' ? props.pressOutStiffness : props.stiffness;
    const damping = typeof props.pressOutDamping !== 'undefined' ? props.pressOutDamping : props.damping;
    const mass = typeof props.pressOutMass !== 'undefined' ? props.pressOutMass : props.mass;

    if (props.disabled) {
      return;
    }

    Animated.spring(this.scaleAnimation, {
      toValue: props.defaultScale,
      stiffness: stiffness,
      damping: damping,
      mass: mass,
      useNativeDriver: props.useNativeDriver,
    }).start();

    if (props.onPressOut) {
      props.onPressOut(...args);
    }
  }
}

TouchableScale.propTypes = {
  ...TouchableWithoutFeedback.propTypes,
  style: PropTypes.any,
  defaultScale: PropTypes.number.isRequired,
  activeScale: PropTypes.number.isRequired,
  activeColor: PropTypes.any,
  stiffness: PropTypes.number.isRequired,
  damping: PropTypes.number.isRequired,
  mass: PropTypes.number.isRequired,
  pressInStiffness: PropTypes.number,
  pressInDamping: PropTypes.number,
  pressInMass: PropTypes.number,
  pressOutStiffness: PropTypes.number,
  pressOutDamping: PropTypes.number,
  pressOutMass: PropTypes.number,
  useNativeDriver: PropTypes.bool,
};

TouchableScale.defaultProps = {
  defaultScale: 1,
  activeScale: 0.9,
  activeColor: null,
  stiffness: 100,
  damping: 10,
  mass: 0.5,
  useNativeDriver: false,
};