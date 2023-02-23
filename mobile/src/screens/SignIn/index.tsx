import { useNavigation } from '@react-navigation/native';
import * as AuthSession from 'expo-auth-session';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, Text, TouchableOpacity } from 'react-native';
import { GameController } from 'phosphor-react-native';

import { AUTH_URL } from 'react-native-dotenv';

import logoImg from '../../assets/logo-nlw-esports.png';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

import { styles } from './styles';
import { THEME } from '../../theme';

export function SignIn() {
  const navigation = useNavigation();

  async function handleDiscordSignIn() {
    const authResponse = await AuthSession.startAsync({
      // https://discord.com/developers/applications
      authUrl: AUTH_URL ?? '',
    }).catch((err) => console.error(err));

    if (!authResponse) {
      return;
    }

    if (authResponse.type === 'success') {
      fetch('https://discord.com/api/users/@me', {
        headers: {
          authorization: `Bearer ${authResponse.params.access_token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          navigation.navigate('home');
        })
        .catch((err) => console.error(err));
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
