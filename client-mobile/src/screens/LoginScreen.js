import { View, StyleSheet, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { Button, Card, Input, Text, Icon } from '@ui-kitten/components';
import React from 'react';

const AlertIcon = (props) => (
  <Icon {...props} name='alert-circle-outline' />
);

export default function Login({ navigation }) {
  const [value, setValue] = React.useState({
    email: '',
    password: ''
  });


  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const renderIcon = (props) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );

  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
      </View>
    )
  }
  function onPressLearnMore() {
    navigation.navigate('Tabs')
  }


  const Footer = (props) => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button
        style={styles.footerControl}
        appearance='outline'
        status='warning'
        onPress={onPressLearnMore}
        size='small'>
        LOGIN
      </Button>
      <Button
        style={styles.footerControl}
        appearance='outline'
        status='warning'
        onPress={onPressLearnMore}
        size='small'>
        SIGNUP
      </Button>
    </View>
  );

  function mailVaule(el) {
    setValue({ ...value, email: el })
  }
  function passValue(el) {
    setValue({ ...value, password: el })
  }
  console.log(value.email, "==", value.password)

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={
            require('../assets/imgTemplate/Signup.png')
          }
          resizeMode="cover"
          style={styles.image}>
          <React.Fragment>

            <Card style={styles.card} footer={Footer}>
              <Input
                placeholder='Email'
                value={value.email}
                onChangeText={el => mailVaule(el)}
              />
              <Input
                style={{ marginTop: 10 }}
                value={value.password}
                placeholder='Password'
                caption={renderCaption}
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={el => passValue(el)}
              />
            </Card>

          </React.Fragment>
        </ImageBackground>
      </View>
    </>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  btn: {
    backgroundColor: '#FFFFFF50',
    borderColor: '#FFFFFF50',
    width: '70%',
    alignItems: 'center'
  },
  card: {
    margin: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF99',
    borderColor: '#FFFFFF99',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5
  },
  captionText: {
    fontSize: 12,
    fontWeight: "400",
    fontFamily: "opensans-regular",
    color: "#8F9BB3",
  }
});
