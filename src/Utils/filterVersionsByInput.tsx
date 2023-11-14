const filterVersionsByInput = (data: any, versionFilterByInput: any) => {
  if (!versionFilterByInput) return data;

  let filteredVersions = data;
  console.log(filteredVersions);

  if (versionFilterByInput.length > 0) {
    console.log("yes");

    filteredVersions = filteredVersions.filter((version: any) =>
      version.name.toLowerCase().includes(versionFilterByInput[0].toLowerCase())
    );
  }
  return filteredVersions;
};

export default filterVersionsByInput;
