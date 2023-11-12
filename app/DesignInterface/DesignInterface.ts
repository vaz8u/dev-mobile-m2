import React from 'react';

// Interface qui permet de définir les fonctions qui seront utilisées pour le design
export default interface DesignInterface {
  /* Fonction qui permet de créer un bouton
   * @param onPress : Fonction qui sera appelée quand le bouton sera pressé
   * @param label : Texte du bouton
   */
  renderButton(onPress: () => void, label: string): React.ReactNode;

  /* Fonction qui permet de créer une carte
   * @param title : Texte du titre
   * @param content : Texte du contenu
   */
  renderCard(title: string, content: string): React.ReactNode;
}
