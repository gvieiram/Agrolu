import React, { useEffect, useState, useCallback } from 'react';
import { Linking, View } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';

import 'dayjs/locale/pt-br';

import { RFValue } from 'react-native-responsive-fontsize';

import {
  MaterialIcons,
  MaterialCommunityIcons as MaterialCoIcons,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import {
  parsePatterns,
  renderBubble,
  renderSend,
  scrollToBottomComponent,
  renderInputToolbar,
} from './ChatStyle';
import {
  Container,
  Header,
  HeaderContent,
  HeaderTitle,
  BackButton,
  AnnouncementRef,
  Image,
  Description,
  Title,
  Price,
  ChatView,
} from './styles';

const date = new Date();

interface Props {
  currentUser: Array<User>;
  message: Array<Message>;
}

interface User {
  id: number;
  name: string;
  avatar: string;
}

interface Message {
  id: number;
  text: string;
  createdAt: typeof date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
}

export function Chat({ message, currentUser }: Props) {
  const theme = useTheme();
  const navigation = useNavigation();

  function handleBack() {
    navigation.goBack();
  }

  const [messages, setMessages] = useState([]);

  // ToDo -> Buscar user na api (try/catch)

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hoje eu acordei todo Nicolas Cagezinho',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Dianho',
          avatar:
            'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
        },
        // image:
        //   'https://portalrva.com.br/wp-content/uploads/2020/12/dianho.jpeg',
        // You can also add a video prop:
        // video:
        // 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        // Mark the message as sent, using one tick
        sent: true,
        // Mark the message as received, using two tick
        received: true,
        // Mark the message as pending with a clock loader
        pending: true,
        // Any additional custom parameters are passed through
      },
    ]);
  }, []);

  const onSend = useCallback((_messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, _messages),
    );
  }, []);

  // const renderBubble = props => {
  //   return (
  //     <Bubble
  //       {...props}
  //       wrapperStyle={{
  //         right: {
  //           backgroundColor: theme.colors.green_dark_opaque,
  //         },
  //       }}
  //     />
  //   );
  // };

  // const renderSend = props => {
  //   return (
  //     <Send {...props}>
  //       <View>
  //         <MaterialIcons
  //           name="send"
  //           size={26}
  //           color={theme.colors.cinza_apagado}
  //           style={{
  //             marginBottom: 9,
  //             marginRight: 10,
  //           }}
  //         />
  //       </View>
  //     </Send>
  //   );
  // };

  // const scrollToBottomComponent = () => {
  //   return (
  //     <MaterialCoIcons
  //       name="chevron-double-down"
  //       size={24}
  //       color={theme.colors.title_item_gray}
  //     />
  //   );
  // };

  // const parsePatterns = (_linkStyle: any) => {
  //   return [
  //     {
  //       pattern: /#(\w+)/,
  //       style: _linkStyle,
  //       onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
  //     },
  //     {
  //       pattern: /([(]\d{2,3}[)]\s?)?\d{4,5}[-]\d{4}/,
  //       style: _linkStyle,
  //       onPress: phone => Linking.openURL(`tel: ${phone}`),
  //     },
  //   ];
  // };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <BackButton onPress={handleBack} />

          <HeaderTitle>Joaquim Rosa</HeaderTitle>
        </HeaderContent>
      </Header>

      <AnnouncementRef
        activeOpacity={0.7}
        style={{
          borderBottomWidth: 0.7,
          borderBottomColor: theme.colors.gray_line_dark,
        }}
      >
        <Image
          source={{
            uri: 'https://www.valtra.com.br/content/dam/public/valtra/pt-br/produtos/tratores/a2s/A2S.jpg',
          }}
          resizeMode="cover"
        />
        <Description>
          <Title>Trator Valtra BM</Title>
          <Price>R$ 190,00/dia</Price>
        </Description>
      </AnnouncementRef>

      <ChatView>
        <GiftedChat
          messages={messages}
          onSend={_messages => onSend(_messages)}
          user={{ _id: 1 }}
          placeholder="Digite uma mensagem..."
          locale="pt-br"
          dateFormat="LL"
          // renderAvatar={null}
          renderBubble={renderBubble}
          showAvatarForEveryMessage
          renderSend={renderSend}
          renderInputToolbar={renderInputToolbar}
          // onLongPress={onLongPress}
          textInputStyle={{
            padding: 10,
            fontSize: 18,
            fontFamily: theme.fonts.regular_400,
          }}
          alwaysShowSend
          scrollToBottom
          scrollToBottomComponent={scrollToBottomComponent}
          parsePatterns={parsePatterns}
          // onLongPress={message.map(m => m.createdAt.)}
        />
      </ChatView>
    </Container>
  );
}
