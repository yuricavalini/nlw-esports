import { useNavigation } from '@react-navigation/native'
import * as AuthSession from 'expo-auth-session'

import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity } from 'react-native';
import { GameController } from 'phosphor-react-native';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles'
import { THEME } from '../../theme';

export function SignIn() {
  const navigation = useNavigation();

  async function handleDiscordSignIn() {
    const response = await AuthSession.startAsync({
      // https://discord.com/developers/applications
      authUrl: 'https://discord.com/api/oauth2/authorize?client_id=1022902036720783380&redirect_uri=https%3A%2F%2Fauth.expo.io%2F%40yuriwlc%2Fmobile&response_type=token&scope=identify'
    })
    
    console.log(response);

    if (response.type === 'success') {
      fetch('https://discord.com/api/users/@me', {
        headers: {
          'authorization': `Bearer ${response.params.access_token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        navigation.navigate('home');
      })
    }
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />

        <Heading
          title="Entrar"
          subtitle="Encontre o seu duo e bora jogar."
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleDiscordSignIn}
        >
          <GameController
            color={THEME.COLORS.TEXT}
            size={20}
          />

          <Text style={styles.buttonTitle}>
            Entrar com Discord
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </Background>
  );
}
