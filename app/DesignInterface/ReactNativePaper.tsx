import React from 'react';
import DesignInterface from './DesignInterface';
import { Button, Card as PaperCard, Title, Paragraph} from 'react-native-paper';

// Implémentation spécifique à React Native Paper
class ReactNativePaper implements DesignInterface {

  renderButton(onPress: () => void, label: string): React.ReactNode {
    return (
      <Button onPress={onPress} style={{ /* Styles spécifiques à React Native Paper */ }}>
        {label}
      </Button>
    );
  }

  renderCard(title: string, content: string): React.ReactNode {
    return (
      <PaperCard>
        <PaperCard.Title title={title} />
        <PaperCard.Content>
          <Title>{title}</Title>
          <Paragraph>{content}</Paragraph>
        </PaperCard.Content>
      </PaperCard>
    );
  }
}

export default ReactNativePaper;
