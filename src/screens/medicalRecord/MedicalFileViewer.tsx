import React, { createRef, useEffect, useMemo, useState } from "react"
import {
  Text,
  TouchableOpacity,
  View,
} from "react-native"
import { useTheme } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
/**
 * ? Local Imports
 */
import createStyles from "./MedicalRecordScreen.style"
import PrevSvg from "../../assets/icons/prev.svg"
import NextSvg from "../../assets/icons/next.svg"
import DownloadSvg from "../../assets/icons/download.svg"
/**
 * ? Shared Imports
 */
import Pdf from "react-native-pdf"
import Navigation from "components/Navigation"
import ButtonTabs from "components/ButtonTabs"

interface MedicalFileViewerProps {
  navigation: any
  route: any
}

const MedicalFileViewer: React.FC<MedicalFileViewerProps> = (props) => {
  //   const theme = useTheme()
  //   const { colors } = theme
  //   const styles = useMemo(() => createStyles(theme), [theme])
  const theme = useTheme()
  const { colors } = theme
  const styles = useMemo(() => createStyles(theme), [theme])
  // const { fileObject } = props.route.params
  const pdfRef = createRef<React.ElementRef<typeof Pdf>>()
  const [title, setTitle] = useState<string>('Dr. Ho Wai Ming')
  const [activeIndex, setActiveIndex] = useState<number>(props.route.params.activeIndex || 0)
  const [pdfUrl, setPdfUrl] = useState<string>('https://firebasestorage.googleapis.com/v0/b/peach-fb.appspot.com/o/Sample_TY01_body%20check%20report_for%20Wistkey.pdf?alt=media&token=92420f6f-619b-4aa2-a6a9-6efeea5e3f10')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalPage, setTotalPage] = useState<number>(0)

  const handleLoadComplete = (numberOfPages, filePath) => {
    console.log(`Number of pages: ${numberOfPages}`)
    // pdfRef.current && pdfRef.current.setPage(3)
  }
  const togglePage = (num: number) => {
    if ((currentPage === 1 && num === -1) || (currentPage === totalPage && num === 1)) {
      return false
    }
    setCurrentPage(currentPage + num)
  }
  return (
    <SafeAreaView style={styles.container}>
      <Navigation titleText={title} />
      <ButtonTabs
        activeIndex={activeIndex}
        setIndex={(index) => {
          setActiveIndex(index)
        }}
      />
      <View style={styles.contentContainer}>
        <Pdf
          ref={pdfRef}
          trustAllCerts={false}
          source={{
            uri: pdfUrl,
          }}
          horizontal={true}
          page={currentPage}
          enablePaging={true}
          onLoadComplete={handleLoadComplete}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`)
            console.log({numberOfPages})
            setCurrentPage(page)
            setTotalPage(numberOfPages)
          }}
          onError={(error) => {
            console.log(error)
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`)
          }}
          style={styles.pdf}
        />
      </View>
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => {
            togglePage(-1)
          }}
        >
          <PrevSvg />
        </TouchableOpacity>
        <Text style={styles.currentPage}>{currentPage + '/' + totalPage}</Text>
        <TouchableOpacity
          onPress={() => {
            togglePage(1)
          }}
        >
          <NextSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.downloadView}>
        <DownloadSvg />
        <Text style={styles.downloadText}>Download</Text>
      </View>
    </SafeAreaView>
  )
}

export default MedicalFileViewer
