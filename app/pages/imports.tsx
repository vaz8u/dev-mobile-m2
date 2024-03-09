import React, { useState } from 'react';
import {  Linking, StyleSheet } from "react-native";
import { View } from '../../components/Themed';
import { List, Button, Text, Snackbar, Searchbar, IconButton, Dialog } from 'react-native-paper';
import liensEDT from '../../assets/liensEDT.json';
import * as importsCalendriers from '../../services/ImportsCalendrier';
import {Calendrier} from '../../models/Evenement';

export default function App() {
    // Liste calendriers détéctés sur le téléphone
    const [liens, setLiens] = useState<string[]>(new Array(0));
    // Le bouton de detection des calendriers du téléphone
    const [loading, setLoading] = useState(false);
    // Barre de recherche
    const [searchQuery, setSearchQuery] = useState<string>('');
    // Liste des calendriers si ils sont déjà ajoutés ou non
    const [boutons_coche, setBoutons_coche] = useState<boolean[]>(new Array(liensEDT.length).fill(true));
    const [boutons_coche_2, setBoutons_coche_2] = useState<boolean[]>(new Array(10).fill(true));
    // Appelé après le click sur un bouton
    // Ajoute 'item' à la liste des calendriers et affiche un snackbar
    const [visible, setVisible] = useState(false);
    const onToggleSnackBar = () => setVisible(!visible);
    const onDismissSnackBar = () => setVisible(false);
    const [text_snackbar, settext_snackbar] = useState<string>('');
    async function ajoutCalendrier(item: string) {
      console.log("Ajout de ", item);
      // si item n'st pas dans liensEDT
      if(liensEDT.findIndex((lien: any) => lien.id === item) === -1){
        console.log("Ajout de ", item, " depuis le téléphone");
        // Si l'ajout à réussi
        if(await importsCalendriers.getAndSetCalendriers(item)){
          onToggleSnackBar();
          settext_snackbar("Ajout de "+item.toUpperCase()+" à la liste des calendriers");
          setBoutons_coche_2(boutons_coche_2.map((value, index) => index === liens.findIndex((lien: any) => lien === item) ? false : value));
        }
        // Si l'ajout n'a pas réussi
        else {
          console.log("Erreur lors de l'ajout de ", item);
          onToggleSnackBar();
          settext_snackbar("Erreur lors de l'ajout de "+item.toUpperCase()+" à la liste des calendriers");
        }
      }
      // Si l'ajout à réussi
      if(await importsCalendriers.getAndSetCalendriers(item)){
        onToggleSnackBar();
        settext_snackbar("Ajout de "+item.toUpperCase()+" à la liste des calendriers");
        setBoutons_coche(boutons_coche.map((value, index) => index === liensEDT.findIndex((lien: any) => lien.id === item) ? false : value));
      }
      // Si l'ajout n'a pas réussi
      else {
        console.log("Erreur lors de l'ajout de ", item);
        onToggleSnackBar();
        settext_snackbar("Erreur lors de l'ajout de "+item.toUpperCase()+" à la liste des calendriers");
      }
    }

    // Appelé après le click sur la poubelle
    // Affiche une boite de dialogue pour confirmer la suppression
    const [visibleDialog, setVisibleDialog] = useState(false);
    const showDialog = () => setVisibleDialog(true);
    const hideDialog = () => setVisibleDialog(false);
    const [deleteitem, setDeleteItem] = useState<string>('');
    function handleDeleteIconPress(item: string) {
      console.log("Suppresion de ",item);
      showDialog();
      setDeleteItem(item);
    }

    // Affiche un bouton "Ajouter" ou "Ajouté" en fonction de si le calendrier est déjà ajouté ou non
    function boutonAjouter(subItem: any, list: any) {
      if(boutons_coche[liensEDT.findIndex((lien: any) => lien.id === subItem)] || boutons_coche_2[liens.findIndex((lien: any) => lien === subItem)]){
        return (
            <Button
                icon="plus-circle-outline" 
                mode="contained-tonal" 
                onPress={() => ajoutCalendrier(subItem)}>
                Ajouter
            </Button>
        );
      }
      else {
        return (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button
                icon="check-circle-outline" 
                mode="contained-tonal">
                Ajouté
            </Button>
            <IconButton
              icon="trash-can-outline"
              iconColor="red"              
              onPress={() => handleDeleteIconPress(subItem)}/>
          </View>
        );
      }
    }

    // Calendriers manuels
    const [calendriersManuels, setCalendriersManuels] = useState<Calendrier[]>([]);
    function boutonAjouterImport(calendrier : string){
      return (
      <Button icon="import"
              mode='contained-tonal'
              disabled={undefined}
              onPress={() => {
                ajoutCalendrier(calendrier);
                setCalendriersManuels(calendriersManuels.filter((item) => item.nom !== calendrier));
              }}>
                Importer
      </Button>);
    }

    const [AuthcalendriersTelephone, setAuthcalendriersTelephone] = useState(true);

    async function setCalendrierTelephone() {
      const newLiens = await importsCalendriers.getCalendriers();
      setLiens(newLiens);
      if(newLiens[0] == 'denied'){
        setAuthcalendriersTelephone(false);
      }
    }
    

    return (
        <View>
          <Text style={styles.titre}>Options d'importation d'emploi du temps</Text>
            
            <List.Accordion
              id="Fac"
              title="Fac"
            >
              <Searchbar
                placeholder="Rechercher une classe ..."
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={styles.searchbar}
              />
              <List.Subheader style={styles.text}>UFR MIM</List.Subheader>
              {liensEDT
                .map((lien: any) => lien.id)
                .filter((lien: any) => lien.toUpperCase() !== 'BASE')
                .filter((lien: any) => lien.toUpperCase().includes(searchQuery.toUpperCase()))
                .map((lien: any) => (
                  <List.Item
                    key={lien.id}
                    title={lien.toUpperCase()}
                    right={() => boutonAjouter(lien,'fac')}
                  />
              ))}
            </List.Accordion>

            <List.Accordion
              id="Calendriers du téléphone"
              title="Calendriers du téléphone"
            >
                {AuthcalendriersTelephone ? (
                  <Button
                    mode="contained-tonal"
                    style={styles.button_center}
                    onPress={async () => {
                      setLiens([]);
                      setLoading(loading => !loading);
                      await setCalendrierTelephone();
                      setLoading(loading => !loading);
                    }}
                    loading={loading}
                  >
                    Détecter les calendriers
                  </Button>
                ) : (
                  <Button
                    mode="contained-tonal"
                    style={styles.button_center}
                    onPress={async () => {
                      setLiens([]);
                      Linking.openSettings();
                      await setCalendrierTelephone();
                    }}
                  >
                    Autoriser l'accès aux calendriers
                  </Button>
                )}
                {(liens.length === 0 || liens[0] == 'denied') && !loading ?(
                <Text style={styles.text}>La liste est vide</Text>
              ) : (
                liens.map((subItem) => (
                  <List.Item
                    key={subItem}
                    title={subItem}
                    right={() => boutonAjouter(subItem,'phone')}
                  />
                ))
              )}
            </List.Accordion>

          <Button
              id="Import manuel"
              mode='elevated'
              icon='file-import-outline'
              style={styles.button_center}
              onPress={async () => setCalendriersManuels(await importsCalendriers.importManuel())}>
              Import manuel
          </Button>

          {calendriersManuels != undefined && calendriersManuels.length > 0 ? (
            <Text style={styles.titre}>Calendriers trouvés</Text>
          ) : (<Text children={undefined}></Text>
            // Code to be executed if the condition is false
          )}

          {calendriersManuels.map((calendrier) => (
            <List.Item
              key={calendrier.nom}
              title={calendrier.nom}
              right={() => boutonAjouterImport(calendrier.nom)}
            />
          ))}

          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}
            duration={2000}
            style={styles.snackbar}>
            <Text style={styles.snackbar_text}>{text_snackbar}</Text>
          </Snackbar>

          <Dialog visible={visibleDialog} onDismiss={hideDialog}>
            <Dialog.Title>Suppression</Dialog.Title>
            <Dialog.Content>
              <Text variant="bodyMedium">Voulez vous vraiment supprimer {deleteitem.toUpperCase()} des calendriers ?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => {
                hideDialog();
                importsCalendriers.deleteCalendrier(deleteitem);
                if(liensEDT.findIndex((lien: any) => lien.id === deleteitem) !== -1)
                  setBoutons_coche(boutons_coche.map((value, index) => index === liensEDT.findIndex((lien: any) => lien.id === deleteitem) ? true : value));
                else
                  setBoutons_coche_2(boutons_coche_2.map((value, index) => index === liens.findIndex((lien: any) => lien === deleteitem) ? true : value));
              }}>Oui</Button>
              <Button onPress={hideDialog}>Non</Button>
            </Dialog.Actions>
            </Dialog>
          
        </View>
      );
    }

const styles = StyleSheet.create({
  button_center: {
    width: '75%',
    alignSelf: 'center',
    marginTop: 30,    
  },
  titre : {
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text : {
    textAlign: 'center',
  },
  accordeon: {
    margin: 10,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 50
  },
  snackbar: {
    bottom: 0,
    left: 0,
    right: 0,
  },
  snackbar_text: {
    color: 'white',
    alignSelf: 'center'
  },
  searchbar: {
    marginHorizontal: 10,
    marginTop: 5
  }
});
