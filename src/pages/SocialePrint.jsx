import { Document,Font,Image,Page, StyleSheet, Text, View,Svg,Path } from "@react-pdf/renderer";
import { createTw } from "react-pdf-tailwind";

const tw = createTw({
  theme: {
    fontFamily: {
      sans: ["Comic Sans"],
    },
    extend: {
      fontFamily: {
        'roboto': ['"Roboto Serif"', "serif"],
      },
    },
  },
});

const styles = StyleSheet.create({
    table: { 
      display: "table", 
      width: "auto", 
      borderStyle: "solid", 
      borderWidth: 2, 
      borderRightWidth: 0, 
      borderBottomWidth: 0 
    }, 
    tableRow: { 
      margin: "auto", 
      flexDirection: "row" 
    }, 
    tableCol: { 
      width: "25%", 
      borderStyle: "solid", 
      borderWidth: 1, 
      borderLeftWidth: 0, 
      borderTopWidth: 0 
    }, 
    tableCell: { 
      margin: "auto", 
      marginTop: 5, 
      fontSize: 10 
    }
  });


function SocialePrint({selectionne,session}) {
  return (
    <Document author="CROUSZ">
    {selectionne?.map(s => (
        <Page size="A4" key={s.id} style={{margin:10}}>
        <View style={tw("flex flex-row my-5")}>
                <View style={tw("flex flex-col")}>
                        <View>
                        <Text style={{fontSize:'8px', textTransform: "uppercase"}}> République du Sénégal</Text>
                        </View>
                        <View  style={tw('font-bold')}>
                        <Text style={{fontSize:'12px',textAlign:"center"}}> ************************</Text>
                    </View>
                        <View  style={tw('font-semibold')}>
                        <Text style={{fontSize:'8px',textTransform: "uppercase"}}> Un peuple - Un but - Une foi</Text>
                    </View>
                    <View  style={tw('font-bold')}>
                        <Text style={{fontSize:'12px'}}> ************************</Text>
                    </View>
                    <View  style={tw("font-semibold")}>
                        <Text style={{fontSize:'8px',textTransform: "uppercase",textAlign:"center"}}>Ministère de l'Enseignement Supérieur, de la Recherche et de
                        l'Innovation </Text> 
                    </View>
                    <View  style={tw('font-bold')}>
                        <Text style={{fontSize:'12px'}}> ************************</Text>
                    </View>
                    <View  style={tw('flex flex-col')} >
                    <Text style={{fontSize:'8px',textTransform: "uppercase", textAlign:"center"}}>Centre Régional des Oeuvres Universitaires Sociales de
                        Ziguinchor </Text>
                        <Text style={{fontSize:'8px'}}>(CROUS/Z)</Text>  
                    </View>
                    </View>
        </View>
        <View style={tw("flex flex-col items-center justify-center")}>
            <Text>CODIFICATION SOCIALE DE LA SESSION {session}</Text>
        </View>
        <View style={tw("my-5 py-4 px-10 bg-sky-500")}><Text>DEPARTEMENT : {s.nom}</Text></View>
        {s.formations.map((f,i) => (
            <View key={i}>
            <View style={tw("flex flex-row items-center justify-center my-2 underline")}><Text> {f.nom}</Text></View> 
            <View style={styles.body}>
                <View style={styles.table}> 
                  <View style={styles.tableRow}> 
                    <View style={{...styles.tableCol,backgroundColor: "black",padding:2}}> 
                      <Text style={{...styles.tableCell,color: "white",fontStyle: "18px", fontWeight: "bold"}}>NCE</Text> 
                    </View> 
                    <View style={{...styles.tableCol,backgroundColor: "black",padding:2}}> 
                      <Text style={{...styles.tableCell,color: "white",fontStyle: "18px", fontWeight: "bold"}}>PRENOM</Text> 
                    </View> 
                    <View style={{...styles.tableCol,backgroundColor: "black",padding:2}}> 
                      <Text style={{...styles.tableCell,color: "white",fontStyle: "18px", fontWeight: "bold"}}>NOM</Text> 
                    </View> 
                    <View style={{...styles.tableCol,backgroundColor: "black",padding:2}}> 
                      <Text style={{...styles.tableCell,color: "white",fontStyle: "18px", fontWeight: "bold"}}>Chambre</Text> 
                    </View> 
                  </View>
                   {f.selectionnes.map(sel => (
                    <View style={styles.tableRow} key={sel._id}> 
                    <View style={{...styles.tableCol,backgroundColor: sel.inscription.etudiant.sexe === "H" ? "#07e664" : "#07b5e6"}}> 
                      <Text style={styles.tableCell}>{sel.inscription.etudiant.nce}</Text> 
                    </View> 
                    <View style={{...styles.tableCol,backgroundColor: sel.inscription.etudiant.sexe === "H" ? "#07e664" : "#07b5e6"}}> 
                      <Text style={styles.tableCell}>{sel.inscription.etudiant.prenom} </Text> 
                    </View> 
                    <View style={{...styles.tableCol,backgroundColor: sel.inscription.etudiant.sexe === "H" ? "#07e664" : "#07b5e6"}}>
                      <Text style={styles.tableCell}>{sel.inscription.etudiant.nom}</Text> 
                    </View>
                    <View style={{...styles.tableCol,backgroundColor: sel.inscription.etudiant.sexe === "H" ? "#07e664" : "#07b5e6"}}> 
                      <Text style={styles.tableCell}>5B</Text> 
                    </View> 
                  </View> 
                    ))}
                </View>
              </View>
           
            </View>
        ))}
    </Page>
    ))}
    
   
  </Document>
  )
}

export default SocialePrint