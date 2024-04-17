import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";
import { upload } from "@/lib/upload";

export function useEventForm(editEvent, categories) {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const router = useRouter();

  // Handle category selection

  const [selectedCategory, setSelectedCategory] = useState(
    editEvent?.category || ""
  );
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);

  const loadSubCategories = (categoryId) => {
    if (categoryId) {
      const mainCategory = categories.find((cat) => cat._id === categoryId);
      if (mainCategory?.subCategories) {
        setSubCategories(mainCategory.subCategories);
      }
    }
  };

  // Load subcategories for default category
  useEffect(() => {
    const defaultCategory = categories[0]?._id;
    if (defaultCategory) {
      loadSubCategories(defaultCategory);
    }
  }, []);

  // Load subcategories on initialization and when selectedCategory changes
  useEffect(() => {
    loadSubCategories(selectedCategory);
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubCategories([]);
  };

  // Handle Tag Selection

  const handleTagClick = (subCategoryId) => {
    setSelectedSubCategories((prev) => {
      const updatedSubCategories = prev.includes(subCategoryId)
        ? prev.filter((id) => id !== subCategoryId)
        : [...prev, subCategoryId];

      console.log("Updated subcategories:", updatedSubCategories);

      return updatedSubCategories;
    });
  };

  // Handle costs switch relation with costs input field

  const [isFreeOfCharge, setIsFreeOfCharge] = useState(
    editEvent ? editEvent.costs === "Kostenlos" : true
  );

  const initialCosts = editEvent ? editEvent.costs : "";
  const [costs, setCosts] = useState(initialCosts);

  function handleCostsChange(event) {
    setCosts(event.target.value);
  }

  // Handle start dates relation to end date and vice versa

  const [startDate, setStartDate] = useState(
    editEvent?.start?.date || getFormattedTodaysDate()
  );
  const [endDate, setEndDate] = useState(editEvent?.end?.date || startDate);

  function handleStartDateChange(event) {
    const startDate = event.target.value;
    startDate > endDate && setEndDate(startDate);
    setStartDate(startDate);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  // Handle counter for characters at short description

  const MAX_CHAR_COUNT = 120;
  const [count, setCount] = useState(
    editEvent
      ? MAX_CHAR_COUNT - editEvent.shortDescription.length
      : MAX_CHAR_COUNT
  );

  const recalculateCharacters = (event) => {
    const newCharacterCount = event.target.value.length;
    const newCount = MAX_CHAR_COUNT - newCharacterCount;
    if (newCount !== count) {
      setCount(newCount);
    }
  };

  // Handle linkURLs relation to linkDescription

  const [isLinkRequired, setIsLinkRequired] = useState(
    editEvent ? editEvent.links[0]?.linkDescription : false
  );
  const [isStreetRequired, setIsStreetRequired] = useState(
    editEvent ? editEvent.location?.houseNumber : false
  );

  function checkIfCorrespondingFieldIsRequired(event) {
    const { id, value } = event.target;
    const isInputFilled = value !== "";

    if (id === "linkDescription") {
      setIsLinkRequired(isInputFilled);
    } else if (id === "houseNumber") {
      setIsStreetRequired(isInputFilled);
    }
  }

  // Handle image upload/preview and consent

  const [selectedImage, setSelectedImage] = useState(null);
  const [isImageSelected, setIsImageSelected] = useState(selectedImage);
  const [imagePreview, setImagePreview] = useState(null);
  const [isConsentChecked, setIsConsentChecked] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setIsImageSelected(true);
    } else {
      setIsImageSelected(false);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setIsImageSelected(false);
  };

  // Submitting the form

  const handleSubmit = async (event, onSubmit, selectedImage, editEvent) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    formData.category = selectedCategory;
    formData.subCategories = selectedSubCategories;
    let eventData;

    if (selectedImage) {
      const uploadedImage = await upload(selectedImage);
      eventData = { ...createEventObject(formData), image: uploadedImage };
    } else {
      eventData = createEventObject(formData);
    }

    const newEventID = await onSubmit(eventData);
    event.target.reset();
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}`
    );
  };

  function createEventObject(formData) {
    return {
      createdBy: userID,
      eventName: formData.eventName,
      start: {
        date: formData.startDate,
        time: formData.startTime,
      },
      end: {
        date: formData.endDate,
        time: formData.endTime,
      },
      location: {
        city: formData.city,
        zip: formData.zip,
        street: formData.street,
        houseNumber: formData.houseNumber,
      },
      category: formData.category,
      subCategories: formData.subCategories,
      organization: {
        organizationName: formData.organization,
        organizationContact: formData.contact,
      },
      costs: formData.costs,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      links: [
        {
          url: formData.linkURL,
          linkDescription: formData.linkDescription,
        },
      ],
    };
  }

  const handleCancel = () => {
    router.push("/");
  };

  return {
    selectedCategory,
    subCategories,
    selectedSubCategories,
    isFreeOfCharge,
    setIsFreeOfCharge,
    costs,
    setCosts,
    count,
    recalculateCharacters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    selectedImage,
    setSelectedImage,
    isImageSelected,
    setIsImageSelected,
    imagePreview,
    setImagePreview,
    isConsentChecked,
    setIsConsentChecked,
    submitAttempted,
    setSubmitAttempted,
    handleCategoryChange,
    handleTagClick,
    handleStartDateChange,
    handleEndDateChange,
    handleCostsChange,
    handleImageChange,
    handleDeleteImage,
    handleSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
    isStreetRequired,
    isLinkRequired,
    checkIfCorrespondingFieldIsRequired,
  };
}
