// interface box3Profile {
//   name?: string;
// }

// const [profile, setProfile] = useState<box3Profile>({});
// const [box /* setBox */] = useState<any | undefined>();

// useEffect(() => {
//   const doAsync = async () => {
//     if (address) {
//       const tempProfile = await box3.getProfile(address);
//       if (tempProfile.hasOwnProperty("name")) {
//         setProfile((old: box3Profile) => ({
//           ...old,
//           name: tempProfile.name
//         }));
//         console.log("Profile has been set");
//       }
//     }
//   };
//   doAsync();
// }, [address]);

// const getBox = async () => {
//   if (address) {
//     const tempBox = await box3.openBox(
//       address,
//       await (await getWeb3()).provider
//     );
//     await tempBox.syncDone;
//     console.log("Box has been synced");
//     setBox(tempBox);
//   }
// };
