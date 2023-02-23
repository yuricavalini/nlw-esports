import { useEffect, useState } from 'react';
import {
  TouchableOpacity, View, Image, FlatList, Text, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';

import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { DuoMatch } from '../../components/DuoMatch';
import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const [discordDuoSelected, setDiscordDuoSelected] = useState('');
  const [isLoadingGameAds, setIsLoadingGameAds] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();
  const game = route.params as GameParams;

  useEffect(() => {
    async function fetchDataGameAds() {
      setIsLoadingGameAds(true);

      await fetch(`http://192.168.0.20:3333/games/${game.id}/ads`)
        .then((response) => response.json())
        .then((data: DuoCardProps[]) => setDuos(data))
        .finally(() => setIsLoadingGameAds(false));
    }
    fetchDataGameAds().catch((err) => console.error(err));
  }, [game]);

  async function getDiscordUser(adsId: string) {
    await fetch(`http://192.168.0.20:3333/ads/${adsId}/discord`)
      .then((response) => response.json())
      .then((data: { discord: string }) => setDiscordDuoSelected(data.discord));
  }

  function handleGoBack() {
    navigation.goBack();
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />

          <View style={styles.right} />
        </View>

        <Image
          source={{ uri: game.bannerUrl }}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        {!isLoadingGameAds ? (
          <FlatList
            data={duos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DuoCard
                data={item}
                onConnect={() => getDiscordUser(item.id)}
              />
            )}
            horizontal
            style={styles.containerList}
            contentContainerStyle={
              duos.length > 0
                ? styles.contentList
                : styles.emptyListContent
            }
            showsHorizontalScrollIndicator={false}
            // eslint-disable-next-line react/no-unstable-nested-components
            ListEmptyComponent={() => (
              <Text style={styles.emptyListText}>
                Não há anúncios publicados ainda.
              </Text>
            )}
          />
        ) : (
          <ActivityIndicator
            size={40}
            color={THEME.COLORS.PRIMARY}
            style={styles.emptyListContent}
          />
        )}

        <DuoMatch
          visible={discordDuoSelected.length > 0}
          discord={discordDuoSelected}
          onClose={() => setDiscordDuoSelected('')}
        />
      </SafeAreaView>
    </Background>
  );
}
