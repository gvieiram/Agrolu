/* eslint-disable react/prop-types */
/* eslint-disable object-shorthand */
import React, { FC, useState, ReactElement } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ScrollView,
  Dimensions,
  ColorValue,
} from 'react-native';
import { G } from 'react-native-svg';

import { MaterialIcons } from '@expo/vector-icons';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

export interface StepperProps {
  active: number;
  content: ReactElement[];
  onNext(): void;
  onBack?(): void;
  onFinish(): void;
  wrapperStyle?: ViewStyle;
  stepWrapperStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  stepTextStyle?: TextStyle;
  buttonText?: string[];
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  showButton?: boolean;
  showBackButton?: boolean;
  buttonsWrapperStyle?: ViewStyle;
  disableScroll?: boolean;
  stepLineStyle?: ViewStyle;
  dotActiveColor?: ColorValue;
  dotInactiveColor?: ColorValue;
  buttonIcon?: React.ComponentProps<typeof MaterialIcons>['name'];
}

const search = (keyName: number, myArray: number[]): boolean => {
  let value = false;
  myArray.map(val => {
    if (val === keyName) {
      value = true;
    }
  });
  return value;
};

const Stepper: FC<StepperProps> = props => {
  const {
    active,
    content,
    onBack,
    onNext,
    onFinish,
    wrapperStyle,
    stepStyle,
    stepTextStyle,
    buttonStyle,
    buttonTextStyle,
    showButton = true,
    showBackButton = true,
    buttonsWrapperStyle,
    buttonText = ['Back', 'Next', 'Finish'],
    disableScroll = false,
    stepLineStyle,
    stepWrapperStyle,
    dotActiveColor = '#9c9c9c',
    dotInactiveColor = 'rgba(156, 156, 156, 0.600)',
    buttonIcon,
  } = props;
  const { width, height } = Dimensions.get('window');
  const [step, setStep] = useState<number[]>([0]);
  const pushData = (val: number) => {
    setStep(prev => [...prev, val]);
  };

  const removeData = () => {
    setStep(prev => {
      prev.pop();
      return prev;
    });
  };
  return (
    <View style={[{ flex: 1, width: width, height: height }, wrapperStyle]}>
      <View
        style={[
          {
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          },
          stepWrapperStyle,
        ]}
      >
        {content.map((_, i) => {
          return (
            <React.Fragment key={i}>
              {i !== 0 && (
                <View
                  style={[
                    {
                      flex: 1,
                      height: 1,
                      backgroundColor: 'grey',
                      opacity: 1,
                      marginHorizontal: 10,
                    },
                    stepLineStyle,
                  ]}
                />
              )}
              <View
                style={[
                  {
                    backgroundColor: search(i, step)
                      ? dotActiveColor
                      : dotInactiveColor,
                    width: 25,
                    height: 25,
                    borderRadius: 13,
                    justifyContent: 'center',
                    alignItems: 'center',
                    // opacity: search(i, step) ? 1 : 0.5,
                  },
                  stepStyle,
                ]}
              >
                {search(i, step) ? (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                    &#10003;
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: 'white',
                      },
                      stepTextStyle,
                    ]}
                  >
                    {i + 1}
                  </Text>
                )}
              </View>
            </React.Fragment>
          );
        })}
      </View>
      {disableScroll ? (
        content[active]
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {content[active]}
        </ScrollView>
      )}

      {showButton && (
        <View
          style={[
            {
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
            },
            buttonsWrapperStyle,
          ]}
        >
          {active !== 0 && showBackButton && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
                {
                  backgroundColor: '#a1a1a1',
                },
              ]}
              onPress={() => {
                removeData();
                onBack();
              }}
            >
              {buttonIcon ? (
                <MaterialIcons
                  name={buttonIcon}
                  style={{ fontSize: 32, color: '#FFF' }}
                />
              ) : (
                <Text style={[{ color: 'white' }, buttonTextStyle]}>
                  {buttonText[0]}
                </Text>
              )}
            </TouchableOpacity>
          )}
          {content.length - 1 !== active && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                  marginRight: 10,
                },
                buttonStyle,
              ]}
              onPress={() => {
                pushData(active + 1);
                onNext();
              }}
            >
              {buttonIcon ? (
                <MaterialIcons
                  name={buttonIcon}
                  style={{ fontSize: 32, color: '#FFF' }}
                />
              ) : (
                <Text style={[{ color: 'white' }, buttonTextStyle]}>
                  {buttonText[1]}
                </Text>
              )}
            </TouchableOpacity>
          )}
          {content.length - 1 === active && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                {
                  padding: 10,
                  borderRadius: 4,
                  backgroundColor: '#1976d2',
                  alignSelf: 'flex-start',
                },
                buttonStyle,
              ]}
              onPress={() => onFinish()}
            >
              {buttonIcon ? (
                <MaterialIcons
                  name={buttonIcon}
                  style={{ fontSize: 32, color: '#FFF' }}
                />
              ) : (
                <Text style={[{ color: 'white' }, buttonTextStyle]}>
                  {buttonText[2]}
                </Text>
              )}
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default Stepper;
