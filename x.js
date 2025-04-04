const OngoingBookingsCard = ({ venueName, bookingTime}) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={img} style={styles.cardImage} />
          <View style={styles.cardTextContent}>
            <Text style={styles.venueName}>{venueName}</Text>
            <Text style={styles.bookingTime}>{bookingTime}</Text>
            <View style={styles.paidContainer}>
              <Text style={styles.paidText}>Paid</Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
      </View>
    );
  };

  const CanceledBookingsCard = ({ venueName, bookingTime}) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={img} style={styles.cardImage} />
          <View style={styles.cardTextContent}>
            <Text style={styles.venueName}>{venueName}</Text>
            <Text style={styles.bookingTime}>{bookingTime}</Text>
            <View style={[styles.tagContainer, styles.refundedTag]}>
              <Text style={styles.tagText}>Canceled & Refunded</Text>
            </View>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.bottomTagContainer}>
          <Ionicons name="alert-circle-outline" size={24} color="#FF7878" />
          <Text style={styles.bottomTagText}>You canceled this booking</Text>
        </View>
      </View>
    );
  };

  const CompletedBookingsCard = ({ venueName, bookingTime}) => {
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Image source={img} style={styles.cardImage} />
          <View style={styles.cardTextContent}>
            <Text style={styles.venueName}>{venueName}</Text>
            <Text style={styles.bookingTime}>{bookingTime}</Text>
            <View style={[styles.tagContainer, styles.completedTag]}>
              <Text style={styles.completedTagText}>Completed</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };