function classifier(input) {
  let stu, dOB, len = input.length;
  let memb = [];

  //Checks for valid input
  if (!Array.isArray(input)) {
    throw new Error("Enter valid input, valid input is an array.");
  }
  if (!len) {
    return { noOfGroups: 0 };
  }

  //Creates an array with the name, age, and regNo of students
  for (stu = 0; stu < len; stu++) {
    dOB = parseInt(input[stu].dob);
    memb.push({'name': input[stu].name, 'age': 2019 - dOB, 'dob': input[stu].dob, 'regNo': input[stu].regNo});
  }

  //Sorts the array by age in ascending order
  memb.sort((a, b) => { return a.age - b.age});

  let members = [memb[0]], group = [];

  //loop through memb array to group the students using the if condition.
  for (let i = 1; i < len; i++) {
    if (memb[i].age - members[0].age <= 5 && members.length < 3) {
      members.push(memb[i]);
    } else {
      group.push(members);
      members = [];
      members.push(memb[i]);
    }
  }
  if (members.length) {  //To fetch the last group
    group.push(members);
  }

  //Creates output with specified format.
  const outputKey = group.map(groupIdx => {
    return {
      'members': groupIdx.map(stu => ({
        'name': stu.name,
        'dob': stu.dob,
        'age': stu.age,
        'regNo': stu.regNo
      })),
      'oldest': groupIdx[groupIdx.length - 1].age,
      'sum': groupIdx.reduce((sum, stu) => {return sum + stu.age;}, 0),
      'regNos': groupIdx.map(stu => (Number(stu.regNo))).sort((a, b) => {return a - b;})
    };
  });

  //Generates output indicating the number of groups for specified input
  let data = {};
  data['noOfGroups'] = group.length;

  outputKey.forEach((groupIdx, idx) => {
    let grouping = `group${idx + 1}`;
    data = { ...data, [grouping]: groupIdx};
  });
  return data;
}


export default classifier;
